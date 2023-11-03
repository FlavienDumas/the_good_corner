import RecentAds from "@/components/RecentAds";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home(): React.ReactNode {
  const router = useRouter();
  const [searchTitle, setSearchTitle] = useState<string>();

  useEffect(()=>{
    console.log('use effect, router.query.searchTitle changé')
    if (typeof(router.query.searchTitle) === "string") {
      setSearchTitle(undefined);
    }
    
  },[router.query.searchTitle])

  return (
    <RecentAds searchTitle={searchTitle}/>
  );
}
