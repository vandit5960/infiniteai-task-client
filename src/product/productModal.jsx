import { Button, Input, Modal, Form } from "antd";
import { useState } from "react";
import axios from "axios";
import { useSearch } from "../components/stateProvider";

const ProductModal = ({ visible, onClose }) => {
  const initialProductDetails = {
    name: "",
    color: "",
    category: "",
    price: "",
  };

  const [productData, setProductData] = useState(initialProductDetails);
  const { user, setUser } = useSearch();

  const userId = user.userId;

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const postData = await axios.post(
        "http://localhost:4000/product/insert",
        { ...productData, userId },
        { withCredentials: true }
      );
      if (postData) {
        setProductData(initialProductDetails);
        onClose();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Modal
      title="Product Details Form"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>,
        <Button key="back" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item label="Product Name">
          <Input
            type="text"
            placeholder="Enter product name"
            value={productData.name}
            name="name"
            onChange={handleChange}
            required
          />
        </Form.Item>

        <Form.Item label="Color">
          <Input
            type="text"
            placeholder="Enter product color"
            value={productData.color}
            name="color"
            onChange={handleChange}
            required
          />
        </Form.Item>

        <Form.Item label="Category">
          <Input
            type="text"
            placeholder="Enter product category"
            value={productData.category}
            name="category"
            onChange={handleChange}
            required
          />
        </Form.Item>

        <Form.Item label="Price">
          <Input
            type="number"
            placeholder="Enter product price"
            value={productData.price}
            name="price"
            onChange={handleChange}
            required
            min={0}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;
