import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Table, Button, Space, Form, Input ,message,Modal} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../store/store';
import { createUser, deleteUser, getUsers, updateUser } from '../store/slice/userSlice';
import { toast } from 'react-toastify';




const UserForm = () => {
    const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const isEdit = !!id;

 

  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);

 

  useEffect(() => {
    if (isEdit && users.length > 0) {
      const user = users.find((user) => user.id === Number(id));
      if (user) {
        form.setFieldsValue(user);
      }
    }
  }, [id, form, isEdit, users]);


  

//   const handleSubmit =async (values: any) => {
//     try{

//         const trimmedValues = {
//             name: values.name.trim(),
//             position: values.position.trim(),
//             description: values.description?.trim() || "", // Allow optional description
//           };
      
//           let result;
//           // ✅ Check if fields are empty after trimming
//           if (!trimmedValues.name || !trimmedValues.position || !trimmedValues.description) {
//             toast.warn("Name , Position, Description cannot be empty ");
//             return;
//           }
//         if (isEdit) {
//        result= await     dispatch(updateUser({ id: Number(id), ...trimmedValues  }));
            
//             console.log("result after update ", result.payload.message==='success');
//             //  
//             if(result.payload.message==='success'){
//                 navigate('/userDetails')
//             }
            
//           } else {
              
//          result= await   dispatch(createUser(trimmedValues ));
//          if(result.payload.message==='success'){
//             navigate('/userDetails')
//         }
            
            
//           }

         
        
//     }
//     catch(error:any){
//         if (error.response) {
//             // API responded with an error (e.g., 404, 500)
//             if (error.response.status === 404) {
//               toast.error("User not found!");
//             } else if (error.response.status === 400) {
//               toast.error("Invalid data. Please check your inputs.");
//             } else {
//               toast.error(error.response.data?.message || "Something went wrong!");
//             }
//           } else if (error.request) {
//             // No response from server (e.g., network issue)
//             toast.error("Server not responding. Please try again later.");
//           } 
//     }
    
//     // navigate("/");
//   };

const handleSubmit = async (values: any) => {
    try {
      const trimmedValues = {
        name: values.name.trim(),
        position: values.position.trim(),
        description: values.description?.trim() || "",
      };
  
      if (!trimmedValues.name || !trimmedValues.position || !trimmedValues.description) {
        toast.warn("Name, Position, and Description cannot be empty");
        return;
      }
  
      let result;
  
      if (isEdit) {
        result = await dispatch(updateUser({ id: Number(id), ...trimmedValues })).unwrap();
      } else {
        result = await dispatch(createUser(trimmedValues)).unwrap();
      }
  
      // ✅ Navigate only if operation was successful
      if (result?.message === "success") {
        
        navigate("/userDetails"); // Change this to your desired route
      }
    } catch (error: any) {
      if (error === "Unauthorized! Please log in again.") {
        toast.error("Session expired! Please log in again.");
        // navigate("/login");  // Uncomment this if you want to redirect to login
      } else {
        toast.error(error || "Something went wrong!");
      }
    }
  };
  
  
  
  return (
    <>
    

<div
  className="flex justify-center items-center p-4 md:pt-0 pt-[150px]"
 >
      <div className="w-80 max-w-5xl bg-white p-10 rounded-lg shadow-lg border border-gray-300 mt-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{isEdit ? "Edit User" : "Create User"}</h2>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter name" }]}> 
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item label="Position" name="position" rules={[{ required: true,  message: "Please enter Position" }]}> 
            <Input placeholder="Enter Position" />
          </Form.Item>
         
          <Form.Item label="Description" name="description" rules={[{ required: true,  message: "Please enter description" }]}> 
            <Input.TextArea placeholder="Enter description" rows={4} />
          </Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={() => navigate("/")}>Cancel</Button>
            <Button type="primary" htmlType="submit">{isEdit ? "Update" : "Create"}</Button>
          </div>
        </Form>
      </div>
    </div>
    </>
  )
}

export default UserForm