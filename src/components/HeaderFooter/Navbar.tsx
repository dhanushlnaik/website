import AuthButton from "../auth/authButton";
export function Navbar() {
  return (
    <>
      <div className="flex justify-between px-4 py-2">
        <AuthButton />
      </div>
    </>
  );
}
