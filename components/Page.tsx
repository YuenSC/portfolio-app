import { FC } from "react";

import { MotionBox } from "./Motion";

const Page: FC = ({ children }) => {
  return (
    <MotionBox initial={{ y: 20 }} animate={{ y: 0 }}>
      {children}
    </MotionBox>
  );
};

export default Page;
