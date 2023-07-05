import view from "../../../../assets/images/icons/interface/view.svg";
import remove from "../../../../assets/images/icons/interface/remove.svg";
import Table from "../../../../components/Table";
import TableHeader from "../../../../components/TableHeader";
import { useState } from "react";
import SummaryModal from "../SummaryModal";

import { formatCurrency } from "../../../../utils/FormatCurrency";
import { formatDate } from "../../../../utils/FormatDate";

import { CategoryProps, OrdersProps } from "../../../../types";
import RemoveOrderModal from "../RemoveOrderModal";

const headings = ["Mesa", "Data", "Nome", "Categoria", "Total", "Ações"];

interface OrdersTableProps {
  categories: CategoryProps[];
  finishedOrders: OrdersProps[];
}
const OrdersTable = ({ categories, finishedOrders }: OrdersTableProps) => {
  const [isSummaryModalVisible, setIsSummaryModalVisible] = useState(false);
  const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState<OrdersProps | null>(null);

  const handleCloseSummaryModal = () => {
    setIsSummaryModalVisible(false);
  };
  const handleOpenSummaryModal = (order: OrdersProps) => {
    setIsSummaryModalVisible(true);
    setSelectedOrder(order);
  };
  const handleCloseRemoveModal = () => {
    setIsRemoveModalVisible(false);
  };
  const handleOpenRemoveModal = (order: OrdersProps) => {
    setIsRemoveModalVisible(true);
    setSelectedOrder(order);
  };

  const tableData = finishedOrders.map((order) => ({
    values: [
      order.table,
      order.createdAt && formatDate(order?.createdAt),

      order.products.map((o) => `${o?.product?.name}`).join(", "),
      categories
        .map((c: CategoryProps) => {
          const category = order?.products?.find(
            (p) => p?.product?.category === c?._id
          );
          if (category) {
            return ` ${c?.icon} ${c?.name},`;
          }
        })
        .join(""),

      formatCurrency(
        order.products.reduce(
          (acc, att) => acc + att?.quantity * att.product?.price,
          0
        )
      ),
    ],
    actions: [
      {
        name: "View",
        icon: view,
        action: () => handleOpenSummaryModal(order),
      },
      {
        name: "Remove",
        icon: remove,
        action: () => handleOpenRemoveModal(order),
      },
    ],
  }));

  return (
    <>
      <RemoveOrderModal
        onClose={handleCloseRemoveModal}
        visible={isRemoveModalVisible}
        selectedOrder={selectedOrder}
      />
      <SummaryModal
        selectedOrder={selectedOrder}
        onClose={handleCloseSummaryModal}
        visible={isSummaryModalVisible}
      />

      <TableHeader label="Pedidos" quantity={finishedOrders.length} />
      <Table headings={headings} values={tableData} />
    </>
  );
};

export default OrdersTable;
