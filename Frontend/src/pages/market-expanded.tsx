import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ContainerWithPadding } from "../components/shared/container";
import { Header } from "../components/widgets/header";
import { MarketInfo } from "../components/widgets/markets/market-info";

export const MarketExpandedPage: FC = () => {
  const redirect = useNavigate();
  const { marketId: marketIdProp } = useParams();

  const [marketId, setMarketId] = useState(0);

  const redirectToAllMarkets = useCallback(() => {
    redirect("/markets");
  }, [redirect]);

  useEffect(() => {
    if (!marketIdProp || isNaN(parseInt(marketIdProp))) {
      redirectToAllMarkets();
      return;
    }

    setMarketId(parseInt(marketIdProp));
  }, [marketIdProp, redirectToAllMarkets]);

  return (
    <>
      <Header />
      <ContainerWithPadding>
        {marketId && <MarketInfo marketId={marketId} redirectBack={redirectToAllMarkets} />}
      </ContainerWithPadding>
    </>
  );
};
