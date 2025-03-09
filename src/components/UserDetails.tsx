import React, { useEffect, useState } from 'react'
import { Table, Button, Space , message,Modal} from "antd";
import { useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../store/slice/userSlice';
import { toast } from 'react-toastify';
import { useConfirmModal } from './context/Modals/ConfirmModal';


const UserDetails = () => {
    const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const usersDetails = useSelector((state: RootState) => state.users.users);

  const { showModal } = useConfirmModal();

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
          dispatch(getUsers());
        } else {
          toast.error("Unauthorized! Please login first.");
          navigate("/"); // Redirect to login if no token
        }
      }, [dispatch, navigate]);

  useEffect(() => {
    setUsers(usersDetails);
  }, [usersDetails]);

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Position", dataIndex: "position", key: "position" },
    
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Button icon={<EditOutlined />} type="primary" onClick={() => navigate(`/edit/${record.id}`)}>Edit</Button>
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

//   const handleDelete = (id: number) => {
//     alert("delete")
//     Modal.confirm({
//       title: "Are you sure?",
//       content: "This action cannot be undone.",
//       okText: "Yes, Delete",
//       okType: "danger",
//       cancelText: "Cancel",
//       onOk: async () => {
//         await dispatch(deleteUser(id));
//         message.success("User deleted successfully!");
//       },
//     });
//   };
 
const handleDelete = (id: number) => {
   
    showModal(
      'Are you sure you want to delete this user?', // Message
      () => {
        dispatch(deleteUser(id));
        
      }
    );
  };

return (
    <>
    <div

  className="flex justify-center items-center p-4 md:pt-0 pt-[150px]"
     >
      <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-lg border border-gray-300">
        <div className="flex justify-between mb-4 text-gray-900">
          <h2 className="text-2xl font-bold">User List</h2>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate("/userForm")}>
            Create User
          </Button>
        </div>
        <Table 
          dataSource={users} 
          columns={columns} 
          rowKey="id" 
          className="border border-gray-400 rounded-lg overflow-hidden"
          pagination={false} // Disable pagination
        />
      </div>
    </div>
    </>
  )
}

export default UserDetails