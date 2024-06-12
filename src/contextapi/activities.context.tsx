import { createContext, useState } from 'react';
import { api } from '@/services/api';
import { toast } from 'sonner';

import type { Activity } from '@/@types/Activity';

interface ActivitiesContextType {
	activities: Activity[];
	setActivities: (value: Activity[]) => void;
	Create: (data: Activity) => Promise<any>;
	Delete: (id: number) => Promise<any>;
	AddDomain: (activity_id: number, name: string) => Promise<any>;
	EditDomain: (domain_id: number, name: string) => Promise<any>;
	DeleteDomain: (domain_id: number) => Promise<any>;
	isLoading: boolean;
	isLoading2: boolean;
}

export const ActivitiesContext = createContext({} as ActivitiesContextType);

export const ActivityProvider = ({ children }: any) => {
	const [activities, setActivities] = useState<Activity[]>([]);
	const [isLoading, setLoading] = useState(false);
	const [isLoading2, setLoading2] = useState(false);

	const Create = async (data: Activity) => {
		return new Promise((resolve, reject) => {
			if (isLoading) return;
			setLoading(true);

			api.post('/activities/', {
				title: data.title,
				description: data.description,
				startDate: data.startDate,
				endDate: data.endDate,
				groups: data.groups,
				redirectUrl: data.redirectUrl,
			})
				.then(response => {
					toast.dismiss();

					toast.success('Atividade criada', {
						description: `A atividade ${data.title} foi criada com sucesso.`,
						duration: 2000,
					});

					resolve(response);
				})
				.catch(error => {
					if (!error.response)
						return toast('Problemas na criação', {
							description:
								'Parece que houve um problema na criação, tente novamente mais tarde.',
							duration: 2000,
						});

					toast('Problemas na criação', {
						description:
							error.response.data.message.length > 0
								? error.response.data.message
								: 'Contacte um administrador',
						duration: 5000,
					});
					reject(error);
				})
				.finally(() => {
					setLoading(false);
				});
		});
	};

	const Delete = async (id: number) => {
		return new Promise((resolve, reject) => {
			if (isLoading) return;
			setLoading(true);

			api.delete('/activities', {
				data: {
					id,
				},
			})
				.then(response => {
					toast.dismiss();

					toast.success('Atividade apagada', {
						description: 'A atividade foi apagada com sucesso.',
						duration: 2000,
					});

					resolve(response);
				})
				.catch(error => {
					if (!error.response)
						return toast('Problemas na deleção', {
							description:
								'Parece que houve um problema na deleção, tente novamente mais tarde.',
							duration: 2000,
						});

					toast('Problemas na deleção', {
						description:
							error.response.data.message.length > 0
								? error.response.data.message
								: 'Contacte um administrador',
						duration: 5000,
					});
					reject(error);
				})
				.finally(() => {
					setLoading(false);
				});
		});
	};

	const AddDomain = async (activity_id: number, name: string) => {
		return new Promise((resolve, reject) => {
			if (isLoading) return;
			setLoading(true);

			api.post('/activities/domain', {
				activity_id,
				name,
			})
				.then(response => {
					toast.dismiss();

					toast.success('Domínio adicionado', {
						description: `O domínio ${name} foi adicionado com sucesso.`,
						duration: 2000,
					});

					resolve(response);
				})
				.catch(error => {
					if (!error.response)
						return toast('Problemas na adição', {
							description:
								'Parece que houve um problema na adição, tente novamente mais tarde.',
							duration: 2000,
						});

					toast('Problemas na adição', {
						description:
							error.response.data.message.length > 0
								? error.response.data.message
								: 'Contacte um administrador',
						duration: 5000,
					});
					reject(error);
				})
				.finally(() => {
					setLoading(false);
				});
		});
	};

	const EditDomain = async (domain_id: number, name: string) => {
		return new Promise((resolve, reject) => {
			if (isLoading) return;
			setLoading(true);

			api.put('/activities/domain', {
				domain_id,
				name,
			})
				.then(response => {
					toast.dismiss();

					toast.success('Domínio editado', {
						description: 'O domínio foi editado com sucesso.',
						duration: 2000,
					});

					resolve(response);
				})
				.catch(error => {
					if (!error.response)
						return toast('Problemas na edição', {
							description:
								'Parece que houve um problema na edição, tente novamente mais tarde.',
							duration: 2000,
						});

					toast('Problemas na edição', {
						description:
							error.response.data.message.length > 0
								? error.response.data.message
								: 'Contacte um administrador',
						duration: 5000,
					});
					reject(error);
				})
				.finally(() => {
					setLoading(false);
				});
		});
	};

	const DeleteDomain = async (domain_id: number) => {
		return new Promise((resolve, reject) => {
			if (isLoading2) return;
			setLoading2(true);

			api.delete('/activities/domain', {
				data: {
					domain_id,
				},
			})
				.then(response => {
					toast.dismiss();

					toast.success('Domínio apagado', {
						description: 'O domínio foi apagado com sucesso.',
						duration: 2000,
					});

					resolve(response);
				})
				.catch(error => {
					if (!error.response)
						return toast('Problemas na deleção', {
							description:
								'Parece que houve um problema na deleção, tente novamente mais tarde.',
							duration: 2000,
						});

					toast('Problemas na deleção', {
						description:
							error.response.data.message.length > 0
								? error.response.data.message
								: 'Contacte um administrador',
						duration: 5000,
					});
					reject(error);
				})
				.finally(() => {
					setLoading2(false);
				});
		});
	};

	return (
		<ActivitiesContext.Provider
			value={{
				activities,
				setActivities,
				Create,
				Delete,
				AddDomain,
				EditDomain,
				isLoading,
				isLoading2,
				DeleteDomain,
			}}>
			{children}
		</ActivitiesContext.Provider>
	);
};
