import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GroupsContext } from "@/contextapi/groups.context";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { Student, CreateData } from "@/@types/Group";
import { UserHook } from "@/services/hooks/UserHook";

type Props = {
  students: Student[];
};

export const StudentsData = ({ students }: Props) => {
  const [AnimationParent] = useAutoAnimate();
  const [open, setOpen] = useState(false);
  const [editedUser, setEditedUser] = useState<Student | null>(null);
  const client = UserHook();

  const DataSchema = yup.object().shape({
    studentid: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().required(),
    routerip: yup.string().required(),
  });

  const Context = useContext(GroupsContext);

  const {
    register,
    handleSubmit,
    watch,
    reset,
  } = useForm<CreateData>({
    resolver: yupResolver(DataSchema),
  });

  const Edit = (data: CreateData) => {
    const editedInputs = Object.keys(data).filter(
      (key) => data[key as keyof CreateData] !== editedUser?.[key as keyof CreateData]
    ).map((key) => {
      return {
        key,
        value: data[key as keyof CreateData],
      }
    });

    Context.Update(editedInputs, editedUser?.email as string).then(() => {
      reset();
      setOpen(false);
    });
  }

  const deleteUser = () => {
    Context.DeleteStudent(editedUser?.email as string).then(() => {
      reset();
      setOpen(false);
    });
  };

  return (
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Nº de aluno</TableHead>
						<TableHead>Nome de aluno</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Router IP</TableHead>
						{client.user.role === 'ADMIN' && <TableHead>Código</TableHead>}
						<TableHead className="text-right">Editar</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody ref={AnimationParent}>
					{students.map((user: Student) => (
						<TableRow key={user.email}>
							<TableCell>{user.studentid}</TableCell>

							<TableCell>{user.name}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>{user.routerip}</TableCell>
							{client.user.role === 'ADMIN' && <TableCell>{user.code}</TableCell>}
							<TableCell className="text-right">
								<Dialog open={open && editedUser === user} onOpenChange={setOpen}>
									<DialogTrigger asChild>
										<Button
											className="text-[#1b4c70] hover:text-[#2D9CDB] focus:outline-none bg-transparent hover:bg-inherit"
											onClick={() => {
												setEditedUser(user);
												setOpen(true);
												reset();
											}}>
											Editar
										</Button>
									</DialogTrigger>
									<DialogContent className="sm:max-w-[425px]">
										<DialogHeader>
											<DialogTitle>Editar Estudante</DialogTitle>
											<DialogDescription>
												Clique em editar para salvar as alterações.
											</DialogDescription>
										</DialogHeader>
										<form onSubmit={handleSubmit(Edit)}>
											<div className="grid gap-4 py-4">
												<div className="grid grid-cols-4 items-center gap-4">
													<Label
														htmlFor="name"
														className="text-right flex gap-1">
														Nome
													</Label>
													<Input
														id="name"
														onFocus={() => !!watch('name')}
														className="col-span-3"
														{...register('name')}
														defaultValue={user.name}
														maxLength={40}
													/>
												</div>
												<div className="grid grid-cols-4 items-center gap-4">
													<Label
														htmlFor="email"
														className="text-right flex gap-1">
														Email
													</Label>
													<Input
														id="email"
														onFocus={() => !!watch('email')}
														className="col-span-3"
														type="email"
														defaultValue={user.email}
														maxLength={60}
														{...register('email')}
													/>
												</div>
												<div className="grid grid-cols-4 items-center gap-4">
													<Label
														htmlFor="studentid"
														className="text-right flex gap-1">
														Nº de aluno
													</Label>
													<Input
														id="studentid"
														onFocus={() => !!watch('studentid')}
														className="col-span-3"
														type="text"
														maxLength={200}
														defaultValue={user.studentid}
														{...register('studentid')}
													/>
												</div>
												<div className="grid grid-cols-4 items-center gap-4">
													<Label
														htmlFor="router"
														className="text-right flex gap-1">
														Router IP
													</Label>
													<Input
														id="router"
														onFocus={() => !!watch('routerip')}
														className="col-span-3"
														type="text"
														maxLength={200}
														defaultValue={user.routerip}
														{...register('routerip')}
													/>
												</div>
											</div>
											<DialogFooter>
												<Button
													onClick={() => deleteUser()}
													type="button"
													style={{ background: '#f5766f' }}>
													{Context.isLoading2 ? 'A apagar...' : 'Apagar'}
												</Button>
												<Button
													type="submit"
													style={{ background: '#1b4c70' }}>
													{Context.isLoading ? 'A editar...' : 'Editar'}
												</Button>
											</DialogFooter>
										</form>
									</DialogContent>
								</Dialog>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		);
};
