import { AvatarMenuToggle } from "./toggle";

type AvatarMenuItems = {
   title: string;
   url: string;
};

type AvatarProps = {
   items: AvatarMenuItems[];
   imageUrl: string;
};

const DropdownMenu: React.FC<{ items: AvatarMenuItems[] }> = ({ items }) => (
   <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
      {items.map((item) => (
         <a href={item.url} key={item.title} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            {item.title}
         </a>
      ))}
   </div>
);

export const Avatar: React.FC<AvatarProps> = ({ items, imageUrl }) => {
   return (
      <div className="relative">
         <AvatarMenuToggle imageUrl={imageUrl}>
            <DropdownMenu items={items} />
         </AvatarMenuToggle>
      </div>
   );
};
