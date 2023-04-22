import { FC } from "react";

export const NotFound: FC = () => {
    return <div className="NotFound"><h1>404 - NOT FOUND</h1><br /><h2>{window?.location?.href}</h2></div>
}