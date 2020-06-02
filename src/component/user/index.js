import React, {useEffect} from 'react';
import { atom, useRecoilValue, selector, useSetRecoilState } from 'recoil';

const itemsState = atom({
	key: 'itemsState',
	default: [{
		description: 'Don\'t be lazy, write the post of the week 😬',
		done: false,
	},
	{
		description: 'Don\'t be lazy, write the post of the week 😬',
		done: false,
	},
	{
		description: 'Don\'t be lazy, write the post of the week 😬',
		done: false,
	},{
		description: 'Don\'t be lazy, write the post of the week 😬',
		done: false,
	},
	]
});

const userState = atom({
	key: 'userState',
	default: [{
		name: 'Robin',
		email: 'userRole@gmail.com'
	},
	{
		name: 'David',
		email: 'userRole@gmail.com'
	},
	{
		name: 'Sarah',
		email: 'userRole@gmail.com'
	},{
		name: 'Ben',
		email: 'userRole@gmail.com'
	},
	]
});

const unfinishedItemState = selector({
	key: 'unfinishState',
	get: ({get}) => {
		const items = get(itemsState);
		return items.filter(item => item.done === false)
	}
});

const unfinishedItemCountState = selector({
	key: 'unfinishCountState',
	get: ({get}) => {
		const items = get(unfinishedItemState);
		return items.length;
	}
});


const UserComponent = () => {
	const unFinishItemCount = useRecoilValue(unfinishedItemCountState);
	const items = useRecoilValue(itemsState);
	const onGetNewUser = useSetRecoilState(userState);
	const userList = useRecoilValue(userState);

	const onGetNewUserList = async (page) => {
		const response = await fetch(`https://reqres.in/api/users?page=${page}`).then(response => response.json());
		console.log('response', response)
		onGetNewUser(response.data)
	};

	useEffect(() => {
		const PAGE_DEFAULT = 1;
		onGetNewUserList(PAGE_DEFAULT);
	}, [onGetNewUserList])

  return (
   <>
	  {items.map((item, i) => (
      <div key={i}>
        {item.description}
      </div>
    ))}
		 {userList.map((item, i) => (
      <div key={i}>
        <p>{item.email} : {item.first_name + item.last_name}</p>
      </div>
    ))}
		<p>you have {unFinishItemCount} unfinish item</p>
		{/* <button onClick={onChange}>change description</button> */}
		</>
  )
}

export default UserComponent;