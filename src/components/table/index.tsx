import { User } from "@/@types/User";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  users: User[];
};

export const TableData = ({users}: Props) => {

  return (
    <Table> 
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Avatar</TableHead>
          <TableHead>Nome de utilizador</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Editar</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user: User) => (
          <TableRow>
            <TableCell>
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback>
                    {user.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="text-right">
              <button className="text-black text-xl">...</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
