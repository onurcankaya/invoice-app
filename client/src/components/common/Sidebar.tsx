import Logo from '@assets/logo.svg';
import Avatar from '@assets/image-avatar.jpg';

export default function Sidebar() {
  return (
    <div className="w-[100px] h-screen sticky left-0 bottom-0 flex flex-col items-center justify-between bg-navy rounded-r-2xl">
      <div className="w-full h-[100px] flex items-center justify-center bg-purple rounded-tr-2xl">
        <img src={Logo} alt="invoice app logo" className="w-12" />
      </div>

      <div className="w-full flex justify-center py-4 border-t border-slate-dark rounded-br-2xl">
        <img
          src={Avatar}
          alt="user avatar"
          className="w-12 h-12 rounded-full"
        />
      </div>
    </div>
  );
}
