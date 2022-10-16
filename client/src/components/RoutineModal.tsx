import { Modal, Dropdown, Menu } from "antd";
import type { MenuProps } from "antd";
import { useState } from "react";
import { IRoutineListProps } from "./RoutineList";

interface IRoutineModal {
  isModalOpen: boolean;
  routineItem: IRoutineListProps;
  handleCancel: () => void;
}

const RoutineModal = ({
  isModalOpen,
  routineItem,
  handleCancel,
}: IRoutineModal) => {
  const { title, content, date } = routineItem;
  const [menuKey, setMenuKey] = useState<string>("");

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const dropDownId = e.key;
    setMenuKey(dropDownId);
  };
  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: "delete",
          key: "1",
          onClick: () => {
            handleCancel();
          },
        },
        {
          label: "2nd menu item",
          key: "2",
        },
        {
          label: "3rd menu item",
          key: "3",
        },
      ]}
    />
  );
  const dropDown = (
    <Dropdown.Button
      key={menuKey}
      overlay={menu}
      trigger={["click"]}
      className="dropdown"
      type="text"
    ></Dropdown.Button>
  );

  return (
    <>
      <Modal
        title={[dropDown]}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <h2>{title}</h2>
        <p>{content}</p>
        <p>{date}</p>
      </Modal>
    </>
  );
};

export default RoutineModal;
