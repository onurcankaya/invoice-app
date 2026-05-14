import { Button, type ButtonProps } from './button';

type IconButtonProps = ButtonProps & {
  icon: string;
};

export function IconButton({ icon, children, ...props }: IconButtonProps) {
  return (
    <Button {...props}>
      <img
        src={icon}
        alt=""
        className="absolute left-2 bg-white rounded-full p-2.5"
      />
      <span className="ml-4">{children}</span>
    </Button>
  );
}
