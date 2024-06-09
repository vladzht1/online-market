import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ContainerWithPadding } from "../components/shared/container";
import { Header } from "../components/widgets/header";
import { OrderInfo } from "../components/widgets/orders/order-info";

export const SingleOrderPage: FC = () => {
  const redirect = useNavigate();
  const { orderId: orderIdProp } = useParams();

  const [orderId, setOrderId] = useState(0);

  const redirectToAllOrders = useCallback(() => {
    redirect("/orders");
  }, [redirect]);

  useEffect(() => {
    if (!orderIdProp || isNaN(parseInt(orderIdProp))) {
      redirectToAllOrders();
      return;
    }

    setOrderId(parseInt(orderIdProp));
  }, [orderIdProp, redirectToAllOrders]);

  return (
    <>
      <Header />
      <ContainerWithPadding>
        {orderId && <OrderInfo orderId={orderId} redirectBack={redirectToAllOrders} />}
      </ContainerWithPadding>
    </>
  );
};
