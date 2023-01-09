import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const DefaultLayout = ({ children }: Props) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default DefaultLayout;