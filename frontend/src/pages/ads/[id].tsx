import { useRouter } from "next/router";
import AdDetail, {AdDetailProps} from "@/components/AdDetail";
import { useEffect, useState } from "react";
import { useQuery, gql } from '@apollo/client';

export const queryOneAd = gql`
  query GetOneAd($getOneAdId: ID!) {
    getOneAd(id: $getOneAdId) {
      id
      description
      title
      owner
      price
      picture
      location
      createdAt
      category {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

const AdDetailComponent = (): React.ReactNode => {
    const router = useRouter();
    const adId = router.query.id;
    const [ad, setAd] = useState({} as AdDetailProps);
    const { loading, error, data } = useQuery(queryOneAd, {
      variables: { getOneAdId: adId},
      skip: adId === undefined
    });

    useEffect(()=>{
      if (data){
        setAd(data.getOneAd);
      }
    }, [data])

    return (
        <AdDetail
            id={ad.id}
            title={ad.title}
            description={ad.description}
            owner={ad.owner}
            price={ad.price}
            picture={ad.picture}
            location={ad.location}
            createdAt={ad.createdAt}
            category={ad.category}
            link={ad.link}
        />
    )
}

export default AdDetailComponent;