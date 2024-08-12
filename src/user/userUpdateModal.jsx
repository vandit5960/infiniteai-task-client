import { Button, Input, Modal, Form } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearch } from "../components/stateProvider";
import Signup from "../auth/signup";
import UpdateForm from "./updateForm";

const UserUpdateModal = ({ visible, onClose, data }) => {


  return (
    <Modal
      title="Update Product Details Form"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <UpdateForm userData={data} onClose={onClose}/>
    </Modal>
  );
};

export default UserUpdateModal;
