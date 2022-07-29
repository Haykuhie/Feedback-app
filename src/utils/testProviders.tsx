import { QueryClient, QueryClientProvider } from 'react-query';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { ReactNode } from 'react';
import { render } from '@testing-library/react';

const queryClient = new QueryClient();

const ReactQueryWrapper = ({ children }: { children?: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
const customRender = (component: JSX.Element) =>
  render(component, { wrapper: ReactQueryWrapper });

export { customRender as render };
