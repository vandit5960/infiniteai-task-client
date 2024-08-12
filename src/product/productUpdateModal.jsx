import { Button, Input, Modal, Form } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearch } from "../components/stateProvider";

const ProductUpdateModal = ({ visible, onClose, data }) => {
  const [productData, setProductData] = useState(data);
  const { user } = useSearch();

  useEffect(() => {
    setProductData(data);
  }, [data]);

  const userId = user.userId;

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const postData = await axios.put(
        `http://localhost:4000/product/update/${data._id}`,
        { ...productData },
        { withCredentials: true }
      );
      if (postData) {
        setProductData({}); 
        onClose();
      }
    } catch (err) {
      if (err.response) {
        const status = err.response.status;

        if (status === 405) {
          alert("You are not authorized for this permission");
        }
      }
      console.error(err);
    }
  };

  return (
    <Modal
      title="Update Product Details Form"
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
            value={productData?.name}
            name="name"
            onChange={handleChange}
            required
          />
        </Form.Item>

        <Form.Item label="Color">
          <Input
            type="text"
            placeholder="Enter product color"
            value={productData?.color}
            name="color"
            onChange={handleChange}
            required
          />
        </Form.Item>

        <Form.Item label="Category">
          <Input
            type="text"
            placeholder="Enter product category"
            value={productData?.category}
            name="category"
            onChange={handleChange}
            required
          />
        </Form.Item>

        <Form.Item label="Price">
          <Input
            type="number"
            placeholder="Enter product price"
            value={productData?.price}
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

export default ProductUpdateModal;
