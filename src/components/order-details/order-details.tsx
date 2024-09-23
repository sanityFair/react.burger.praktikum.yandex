import { Ingredient } from "@/types";
import { Modal, ModalProps } from "../modal";

import orderDetailsStyles from "./order-details.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";

type Props = Pick<ModalProps, "isOpen" | "onClose"> & {
  orderId: string;
};

export const OrderDetails = ({ isOpen, onClose, ...props }: Props) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className={orderDetailsStyles.root}>
      <div className={orderDetailsStyles.order}>
        <p className="text text_type_digits-large">{props.orderId}</p>
        <p className="text text_type_main-medium">идентификатор заказа</p>
      </div>
      <div className={classNames(orderDetailsStyles.icon, "mt-15 mb-15")} />
      <p className="text text_type_main-small mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-small text_color_inactive mb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  </Modal>
);
