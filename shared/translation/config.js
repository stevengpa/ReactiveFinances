module.exports = {
	es: {
		header: {
			language: "Lenguaje",
			login: "Iniciar sesión",
			logout: "Cerrar sesión",
			settings: "Mantenimiento",
			dashboard: "Métricas"
		},
		login: {
			title: "Inicio de sesión",
			email: "Correo electrónico",
			email_place: "John@gmail.com",
			code: "Código",
			code_place: "Ingresa el código",
			login: "Ingresar",
			error: "Se produjo un error ó tus credenciales son incorrectas. :( ",
			signup: "Crear cuenta"
		},
		signup: {
			title: "Crear cuenta",
			email: "Correo electrónico",
			email_place: "John@gmail.com",
			signup: "Crear",
			error: "Se produjo un error ó el correo ya se encuentra regitrado. :( ",
			success: "El código de acceso ha sido enviado a tu correo ! :) "
		},
		email_code: {
			title: "Bienvenido a Reactive Finance Tracking !!!",
			subject: "RFT [Credenciales]",
			credential: "Tu credenciales son:",
			user: "Usuario: ",
			code: "Código: "
		},
		settings: {
			exchange: {
				exchange: "Tipo de cambio",
				rate: "Tipo de cambio (USD)",
				rate_place: "Local -> USD",
				rate_ok: "El tipo de cambio ha sido guardado",
				rate_error: "El tipo de cambio es incorrecto",
				currency: "Moneda Local",
				currency_place: "ej: CRC",
				currency_ok: "La moneda local ha sido guardada",
				currency_error: "La moneda local contiene un valor incorrecto"
			},
			category: {
				category: "Categoría",
				category_place: "Nombre",
				category_ok: "La Categoría ha sido guardada",
				category_error: "La Categoía contiene un valor incorrecto ó ya se encuentra en la lista",
				category_update_ok: "La Categoría ha sido actualizada",
				grid: {
					category: "Categoría",
					active: "Activa"
				}
			},
			label: {
				label: "Etiqueta",
				label_place: "Nombre",
				label_ok: "La Etiqueta ha sido guardada",
				label_error: "La Etiqueta contiene un valor incorrecto ó ya se encuentra en la lista",
				label_update_ok: "La Etiqueta fue actualizada",
				grid: {
					label: "Etiqueta",
					active: "Activa"
				}
			},
			entries: {
				add: 'Agregar',
				add_new_title: 'Crear transacción',
				add_update_title: 'Actualizar transacción',
				update: 'Actualizar',
				entry_date: 'Fecha de Ingreso',
				amount: 'Monto',
				amount_place: '1,000.00',
				description: 'Descripción',
				entry_ok: "La transacción ha sido guardada",
				entry_error: "La transacción contiene uno o varios valores incorrectos",
				entry_update_ok: "La transacción fue actualizada",
				delete_ok: "La transacción fue eliminada.",
				delete_error: "Lo sentimos, la transacción no fue eliminada."
			}
		},
		actions: {
			edit: 'Editar',
			delete: "Eliminar",
			save: 'Guardar',
			update: 'Actualizar'
		},
		months: {
			january: "Enero",
			february: "Febrero",
			march: "Marzo",
			april: "Abril",
			may: "Mayo",
			june: "Junio",
			july: "Julio",
			august: "Agosto",
			september: "Septiembre",
			october: "Octubre",
			november: "Noviembre",
			december: "Diciembre"
		},
		calendar_days: ['Dom', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sab'],
		calendar_months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		filters: {
			currency: "Moneda",
			category: "Categoría",
			label: "Etiqueta",
			date: "Fecha"
		},
		table_summary: {
			columns: {
				id: "id",
				category: "Categoría",
				label: "Etiqueta",
				amount_usd: "Monto USD",
				amount_lc: "Monto Local",
				amount: "Monto",
				currency: "Moneda",
				exchange: "Tipo Cambio",
				month: "Mes",
				year: "Año",
				entry_date: "Fecha",
				entry_date_time: "Fecha Ingreso",
				description: "Descripción",
				search: "Buscar",
				delete: "Borrar",
				export_csv: "Exportar CSV"
			}
		}
	},
	en: {
		header: {
			language: "Language",
			login: "Log In",
			logout: "Log Out",
			settings: "Settings",
			dashboard: "Dashboard"
		},
		login: {
			title: "Log In",
			email: "Email",
			email_place: "John@gmail.com",
			code: "Code",
			code_place: "Enter your code",
			login: "Log In",
			signup: "Sign Up",
			error: "An error occurred or your credentials are incorrect. :( ",
		},
		signup: {
			title: "Sign Up",
			email: "Email",
			email_place: "John@gmail.com",
			signup: "Sign Up",
			error: "An error occurred or the email was already registred. :( ",
			success: "Your access code was sent to your email ! :) "
		},
		email_code: {
			title: "Welcome to Reactive Finance Tracking !!!",
			subject: "RFT [Credentials]",
			credential: "Your credentials are: ",
			user: "User: ",
			code: "Code: "
		},
		settings: {
			exchange: {
				exchange: "Exchange Rate",
				rate: "Exchange Rate (USD)",
				rate_place: "Local -> USD",
				rate_ok: "The exchange rate was saved",
				rate_error: "Wrong exchange rate value",
				currency: "Local Currency",
				currency_place: "e.g. USD",
				currency_ok: "The local currency was saved",
				currency_error: "Wrong local currency value"
			},
			category: {
				category: "Category",
				category_place: "Name",
				category_ok: "The Categoría was saved",
				category_error: "Wrong Categoía value or it already was listed",
				category_update_ok: "The Categoría was updated",
				grid: {
					category: "Category",
					active: "Active"
				}
			},
			label: {
				label: "Label",
				label_place: "Name",
				label_ok: "The Label was saved",
				label_error: "Wrong Label value or it already was listed",
				label_update_ok: "The Label was updated",
				grid: {
					label: "Label",
					active: "Active"
				}
			},
			entries: {
				add: 'Add',
				add_new_title: 'Add a new transaction',
				add_update_title: 'Update transaction',
				update: 'Update',
				entry_date: 'Entry Date',
				amount: 'Amount',
				amount_place: '1,000.00',
				description: 'Description',
				entry_ok: "The transaction was saved",
				entry_error: "Wrong transaction value(s)",
				entry_update_ok: "The transaction was updated",
				delete_ok: "The transaction was deleted.",
				delete_error: "Sorry, the transaction was not deleted."
			}
		},
		actions: {
			edit: 'Edit',
			delete: "Delete",
			save: 'Save',
			update: 'Update'
		},
		months: {
			january: "January",
			february: "February",
			march: "March",
			april: "April",
			may: "May",
			june: "June",
			july: "July",
			august: "August",
			september: "September",
			october: "October",
			november: "November",
			december: "December"
		},
		calendar_days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		calendar_months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		filters: {
			currency: "Currency",
			category: "Category",
			label: "Label",
			date: "Date"
		},
		table_summary: {
			columns: {
				id: "id",
				category: "Category",
				label: "Label",
				amount_usd: "Amount USD",
				amount_lc: "Amount Local",
				amount: "Amount",
				currency: "Currency",
				exchange: "Exchange",
				month: "Month",
				year: "Year",
				entry_date: "Date",
				entry_date_time: "Entry Date",
				description: "Description",
				search: "Search",
				delete: "Delete",
				export_csv: "Export to CSV"
			}
		}
	}
};
