"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

type Role = {
	id: number;
	name: string;
	description?: string;
}

type Tariff = {
	id: number;
	name: string;
	t_add_child: number;
	t_edit_child: number;
	t_family_count: number;
}

type User = {
	id: number;
	first_name: string;
	last_name: string;
	middle_name: string;
	phone: string;
	role: Role;
	tariff: Tariff;
}

type Page = {
	id: number;
	title: string;
	t_id: number;
	bread1: string;
	bread2: string;
	bread3: string;
}

type Response = {
	status: string;
	version: string;
	data: Page | [];
}

type AuthContextType = {
	user: User | null;
	page: Page | null;
	checkAuth: () => Promise<void>;
	login: (phone: string, password: string) => Promise<boolean>;
	loading: boolean;
	error: string | null;
	isHydrated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState<Page | null>(null);
	const [isHydrated, setIsHydrated] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		setIsHydrated(true);
		checkAuth();
		getPage();
	}, []);

	const login = async (phone: string, password: string) => {
		try {
			const response = await axios.post('https://api.atatek.kz/auth/login', { phone, password }, { withCredentials: true });
			setUser(response.data.data);
			return true;
		} catch (error) {
			toast("Телефон номеріңіз немесе құпия сөзіңіз қате")
			return false;
		}
	}

	const checkAuth = async () => {
		setLoading(true);
		try {
			const res = await axios.get('https://api.atatek.kz/auth/get-me', {
				withCredentials: true,
			});
			setUser(res.data.data);
			setError(null);
		} catch (error) {
			setUser(null);
			setError('Не авторизован');
		} finally {
			setLoading(false);
		}
	};

	// Handle redirect after hydration
	useEffect(() => {
		if (isHydrated && !loading && !user && error) {
			const isAuthPage = pathname?.startsWith('/auth/');
			if (!isAuthPage) {
				router.push('/auth/login');
			}
		}
	}, [isHydrated, loading, user, error, pathname, router]);
	
	const getPage = async () => {
		try{
			const response = await axios.get<Response>(`https://api.atatek.kz/auth/my-page`, { withCredentials: true });
			if (response.data.status === 'success') {
				setPage(response.data.data as Page);
			}
		}
		catch(error){
			setPage(null);
		}
		
	}

	// Always render children, but handle loading states properly
	return (
		<AuthContext.Provider value={{ user, loading, login, error, checkAuth, page, isHydrated }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used within AuthProvider');
	return context;
};