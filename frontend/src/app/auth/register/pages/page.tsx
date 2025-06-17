import { PageForm } from "@/components/auth/page-form"

export default function LoginPage() {
    return (
      <div className="grid min-h-svh lg:grid-cols-2">
            <div className="hidden lg:block flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center">
                    <img
                    src="/auth-image.png"
                    alt="Image"
                    className="object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4 p-6 md:p-10 bg-muted">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <PageForm />
                    </div>
                </div>
            </div>
      </div>
    )
}
