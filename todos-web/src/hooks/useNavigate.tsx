import {
  useNavigate as useNavigateReactRouter,
  NavigateOptions,
} from "react-router";

export const useNavigate = () => {
  const navigate = useNavigateReactRouter();

  return (to: string, options?: NavigateOptions) => {
    const toUrl = new URL(to, window.location.origin);
    const searchParams = new URLSearchParams(window.location.search);
    toUrl.search = searchParams.toString();
    toUrl.hash = window.location.hash;

    const target = toUrl.toString().substring(window.location.origin.length);
    navigate(target, options);
  };
};
