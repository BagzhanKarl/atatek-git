"use client";
import { NavHeader } from "@/components/nav/NavHeader";
import EditBlock from "@/components/profile/edit-block";
import InfoBlock from "@/components/profile/info-block";
import LeftBlock from "@/components/profile/left-block";
import TicketBlock from "@/components/profile/ticket-block";
import SubsBlock from "@/components/profile/subs-block";
import { ProfileProvider } from "@/contexts/ProfileContext";


export default function ProfilePage() {
    return (
        <ProfileProvider>
            <div className="w-[85vw] mx-auto">
                <NavHeader />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10 mb-10">
                    <div className="md:col-span-1">
                        <LeftBlock />
                    </div>
                    <div className="md:col-span-3">
                        <InfoBlock />
                        <EditBlock />
                        <TicketBlock />
                        <SubsBlock />
                    </div>
                </div>

            </div>
        </ProfileProvider>
    );
}