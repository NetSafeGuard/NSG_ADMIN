import type { User } from '@/@types/User';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { EditData } from '@/@types/EditData';
import { Error } from '@/components/error';
import { useContext, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthContext } from '@/contextapi/global.context';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Badge } from '@/components/ui/badge';
import admin from '../../assets/admin.png';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import type { ActivityDomain, Domain } from '@/@types/Activity';

type Props = {
	activityDomains: ActivityDomain[];
};

export const TableDomainsData = ({ activityDomains }: Props) => {
	const [AnimationParent] = useAutoAnimate();
	const [open, setOpen] = useState(false);
	const [editedDomain, setEditedDomain] = useState<ActivityDomain | null>(null);

	const DataSchema = yup.object().shape({
		name: yup.string().required(),
	});

	const Context = useContext(AuthContext);

	const {
		control,
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<Domain>({
		resolver: yupResolver(DataSchema),
	});

	const Edit = (newData: Domain) => {
		console.log(newData, editedDomain);
	};

	const deleteUser = () => {};

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Dominio</TableHead>
					<TableHead className="text-right pr-6">Editar</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody ref={AnimationParent}>
				{activityDomains.map((activitydomain: ActivityDomain, index: number) => (
					<TableRow key={index}>
						<TableCell>{activitydomain.domain.name}</TableCell>
						<TableCell className="text-right">
							<Dialog
								open={open && editedDomain === activitydomain}
								onOpenChange={setOpen}>
								<DialogTrigger asChild>
									<Button
										className="text-[#1b4c70] hover:text-[#2D9CDB] focus:outline-none bg-transparent hover:bg-inherit"
										onClick={() => {
											setEditedDomain(activitydomain);
											setOpen(true);
										}}>
										Editar
									</Button>
								</DialogTrigger>
								<DialogContent className="sm:max-w-[425px]">
									<DialogHeader>
										<DialogTitle>Editar Dominio</DialogTitle>
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
													{errors.name && <Error error={'*'} />}
												</Label>
												<Input
													id="name"
													onFocus={() => !!watch('name')}
													className="col-span-3"
													{...register('name')}
													defaultValue={activitydomain.domain.name}
													maxLength={40}
												/>
											</div>
										</div>
										<DialogFooter>
											<Button
												onClick={() => deleteUser()}
												type="button"
												style={{ background: '#f5766f' }}>
												{Context.isLoading2 ? 'A Apagar...' : 'Apagar'}
											</Button>
											<Button type="submit" style={{ background: '#1b4c70' }}>
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

