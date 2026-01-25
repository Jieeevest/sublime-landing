import AuthGuard from "@/components/auth/AuthGuard";
import CmsSidebar from "@/components/cms/CmsSidebar";
import CmsTopbar from "@/components/cms/CmsTopbar";

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requireAdmin>
      <div className="min-h-screen bg-[#F5F9FA] flex">
        <CmsSidebar />

        <div className="flex-1 ml-[93px] flex flex-col">
          <CmsTopbar />
          <main className="flex-1 overflow-auto pb-32">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
