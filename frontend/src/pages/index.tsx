import RecentAds from "@/components/RecentAds";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home(): React.ReactNode {
  const router = useRouter();
  const [searchTitle, setSearchTitle] = useState<string>();

  useEffect(()=>{
    console.log("entrée dans le useEffect searchTitle");
    if (typeof(router.query.searchTitle) === "string") {
      console.log("le router de index a détecté searchTitle");
      setSearchTitle(router.query.searchTitle);
    }
  },[searchTitle])

  return (
    <RecentAds title={searchTitle}/>
  );
}
