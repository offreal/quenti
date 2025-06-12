import { Img } from "@react-email/components";

import { env } from "@quizfit/env/client";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  width = 42,
  height = 42,
  className = "h-[42px] w-[42px]",
}) => {
  return (
    <Img
      src={`${env.NEXT_PUBLIC_APP_URL}/android-chrome-192x192.png`}
      width={width}
      height={height}
      alt="Quiz.fit"
      className={className}
    />
  );
};
