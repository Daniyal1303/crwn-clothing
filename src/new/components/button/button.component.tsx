import './button.styles.tsx';
import {BaseButton,GoogleSignInButton,InvertedButton} from './button.styles';

interface buttonProps {
    buttonType?: string ;
    children?:string;
    type?:'submit' | 'button';
    onClick?:React.MouseEventHandler;

}
interface buttonclasses extends buttonProps {
    base: string;
    google: string;
    inverted: string;
}
export const BUTTON_TYPE_CLASSES:buttonclasses = {
    base: "base",
    google: 'google-sign-in',
    inverted: 'inverted',
    
}
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => 
({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);
  
  const Button= ({children,buttonType,...otherProps}:buttonProps) => {
  const CustomButton = getButton(buttonType)
  return (
    <CustomButton {...otherProps}>
      {children}
    </CustomButton>
  )
}
export default Button;