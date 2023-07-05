import { useEffect, useState } from "react";
import { Background, Image } from "./styles";
import logo from "../../../../assets/images/icons/interface/logo.svg";
import useAnimatedUnmount from "../../../../hooks/useAnimatedUnmount";

const SplashModal = () => {
  const [visible, setVisible] = useState(true);
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(visible);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  }, []);

  if (!shouldRender) return null;
  return (
    <Background isLeaving={!visible} ref={animatedElementRef}>
      <Image src={logo} alt="Logo da Waiter app" />
    </Background>
  );
};

export default SplashModal;
