import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import {
  setName,
  setAge,
  setButtonState,
  setEditingUserId,
} from "../store/userSlice";
import { postUser, deleteUser, updateUser, fetchUsers } from "../thunks";
import { useEffect } from "react";
const User: React.FC = () => {
  //step 7 useSelector
  const user = useSelector((state: RootState) => state.userStore);
  //step 8 useDiapatch
  const dispatch = useDispatch<AppDispatch>();
  var id = 0;
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUsers());
    };
    fetchData(); 
  }, [dispatch]);
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(e.target.value));
  };
  const handleAge = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAge(e.target.value));
  };
  //step 10 dispatching thunks
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.buttonState === "add") {
      dispatch(postUser({ id: ++id, name: user.name, age: user.age }));
      dispatch(setName(""));
      dispatch(setAge(""));
    }
  };
  const handleDelete = (userID: number) => {
    dispatch(deleteUser({ id: userID }));
  };
  const handleEdit = (user: any) => {
    dispatch(setName(user.name));
    dispatch(setAge(user.age));
    dispatch(setButtonState("update"));
    dispatch(setEditingUserId(user.id));
  };
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.editingUserId) {
      dispatch(setName(""));
      dispatch(setAge(""));
      dispatch(setButtonState("add"));
      dispatch(setEditingUserId(null));
      dispatch(
        updateUser({ id: user.editingUserId, name: user.name, age: user.age })
      );
    }
  };

  return (
    <div>
      {user.status && <h1>{user.status}</h1>}
      <form>
        <label>Name</label>
        <input type="text" onChange={handleName} value={user.name} />
        <label>Age</label>
        <input type="number" onChange={handleAge} value={user.age} />
        {user.buttonState === "add" && <button onClick={handleAdd}>Add</button>}
        {user.buttonState === "update" && (
          <button onClick={handleUpdate}>update</button>
        )}
      </form>
      {user.users && user.users.length > 0 ? (
        user.users.map((user) => {
          return (
            <li key={user.id}>
              {user.id}: {user.name} - {user.email}
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </li>
          );
        })
      ) : (
        <h1>Please add users</h1>
      )}
    </div>
  );
};
export default User;
