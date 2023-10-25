import { useRouteError, isRouteErrorResponse } from "react-router-dom";

function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <div>{error.data.message}</div>;
  }
}

export default ErrorBoundary;
