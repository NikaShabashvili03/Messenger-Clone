import useCurrentUser from './useCurrentUser';

export default function useOtherUser({conversation}) {
  const currentUser = useCurrentUser();
  if(!conversation){
    return null;
  }
  const users = conversation.user;
  return users.filter((user) => user._id !== currentUser._id);
}
