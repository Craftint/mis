// Copyright (c) 2023, alantechnologies and contributors
// For license information, please see license.txt

frappe.ui.form.on('MIS Report Settings', {
	 refresh: function(frm) {
		frm.set_query('cost_center', function(doc, cdt, cdn) {
		  
			return {
			   "filters": {
			"company": doc.company,
		}
			};
		});

		frm.set_query("group_label", "accounts", function() {
			return {
				filters: {
					"is_group": 0
				}
			}
		});

		/*var d = locals[cdt][cdn];	
		$.each (d.accounts, function(i, d){
		
				//d.project=frm.doc.project_name;
			}); */
	

		/*frm.set_query("account", "accounts", function(doc, cdt, cdn) {
			return {
				filters: {
					"company": doc.company,
				}
			}
		});
		frm.set_query("department", "accounts", function(doc, cdt, cdn) {
			return {
				filters: {
					"company": doc.company,
				}
			}
		});*/
	 }
	 
	
});
frappe.ui.form.on('MIS Report Account Settings', {
	
	type:function(frm, cdt, cdn) {
		//let row = frappe.get_doc(cdt, cdn);
		
		var d = locals[cdt][cdn];
		
		if(d.type=='Account'){
			if (d.parentfield=='accounts'){
				frm.fields_dict.accounts.grid.update_docfield_property("document","options",["GL Entry"]);
			}
			if (d.parentfield=='direct_expense'){
				frm.fields_dict.direct_expense.grid.update_docfield_property("document","options",["GL Entry"]);
			}
			if (d.parentfield=='indirect_expense'){
				frm.fields_dict.indirect_expense.grid.update_docfield_property("document","options",["GL Entry"]);
			}
			if (d.parentfield=='other_income'){
				frm.fields_dict.other_income.grid.update_docfield_property("document","options",["GL Entry"]);
			}
			if (d.parentfield=='other_expense'){
				frm.fields_dict.other_expense.grid.update_docfield_property("document","options",["GL Entry"]);
			}
			if (d.parentfield=='depreciation'){
				frm.fields_dict.depreciation.grid.update_docfield_property("document","options",["GL Entry"]);
			}
			d.document="GL Entry";
		}
		if(d.type=='Department'){
			if (d.parentfield=='accounts'){
				frm.fields_dict.accounts.grid.update_docfield_property("document","options",["Payroll Entry"]);
			}
			if (d.parentfield=='direct_expense'){
				frm.fields_dict.direct_expense.grid.update_docfield_property("document","options",["Payroll Entry"]);
			}
			if (d.parentfield=='indirect_expense'){
				frm.fields_dict.indirect_expense.grid.update_docfield_property("document","options",["Payroll Entry"]);
			}
			if (d.parentfield=='other_income'){
				frm.fields_dict.other_income.grid.update_docfield_property("document","options",["Payroll Entry"]);
			}
			if (d.parentfield=='other_expense'){
				frm.fields_dict.other_expense.grid.update_docfield_property("document","options",["Payroll Entry"]);
			}
			if (d.parentfield=='depreciation'){
				frm.fields_dict.depreciation.grid.update_docfield_property("document","options",["Payroll Entry"]);
			}
			d.document="Payroll Entry";
		}
		if(d.type=='Item Group' || d.type=='Item'){

			if (d.parentfield=='accounts'){
				frm.fields_dict.accounts.grid.update_docfield_property("document","options",["Manufacturing","Stock Transfer"]);
			}
			if (d.parentfield=='direct_expense'){
				frm.fields_dict.direct_expense.grid.update_docfield_property("document","options",["Manufacturing","Stock Transfer"]);
			}
			if (d.parentfield=='indirect_expense'){
				frm.fields_dict.indirect_expense.grid.update_docfield_property("document","options",["Manufacturing","Stock Transfer"]);
			}
			if (d.parentfield=='other_income'){
				frm.fields_dict.other_income.grid.update_docfield_property("document","options",["Manufacturing","Stock Transfer"]);
			}
			if (d.parentfield=='other_expense'){
				frm.fields_dict.other_expense.grid.update_docfield_property("document","options",["Manufacturing","Stock Transfer"]);
			}
			if (d.parentfield=='depreciation'){
				frm.fields_dict.depreciation.grid.update_docfield_property("document","options",["Manufacturing","Stock Transfer"]);
			}
			d.document="Manufacturing";
		}
	},
	accounts_add:function(frm, cdt, cdn) {
		var d = locals[cdt][cdn];
		if(d.type=='Account'){
			if (d.parentfield=='accounts'){
				frm.fields_dict.accounts.grid.update_docfield_property("document","options",["GL Entry"]);
			}
			if (d.parentfield=='direct_expense'){
				frm.fields_dict.direct_expense.grid.update_docfield_property("document","options",["GL Entry"]);
			}
			if (d.parentfield=='indirect_expense'){
				frm.fields_dict.indirect_expense.grid.update_docfield_property("document","options",["GL Entry"]);
			}
			if (d.parentfield=='other_income'){
				frm.fields_dict.other_income.grid.update_docfield_property("document","options",["GL Entry"]);
			}
			if (d.parentfield=='other_expense'){
				frm.fields_dict.other_expense.grid.update_docfield_property("document","options",["GL Entry"]);
			}
			if (d.parentfield=='depreciation'){
				frm.fields_dict.depreciation.grid.update_docfield_property("document","options",["GL Entry"]);
			}
			d.document="GL Entry";
		}
		if(d.type=='Department'){
			if (d.parentfield=='accounts'){
				frm.fields_dict.accounts.grid.update_docfield_property("document","options",["Payroll Entry"]);
			}
			if (d.parentfield=='direct_expense'){
				frm.fields_dict.direct_expense.grid.update_docfield_property("document","options",["Payroll Entry"]);
			}
			if (d.parentfield=='indirect_expense'){
				frm.fields_dict.indirect_expense.grid.update_docfield_property("document","options",["Payroll Entry"]);
			}
			if (d.parentfield=='other_income'){
				frm.fields_dict.other_income.grid.update_docfield_property("document","options",["Payroll Entry"]);
			}
			if (d.parentfield=='other_expense'){
				frm.fields_dict.other_expense.grid.update_docfield_property("document","options",["Payroll Entry"]);
			}
			if (d.parentfield=='depreciation'){
				frm.fields_dict.depreciation.grid.update_docfield_property("document","options",["Payroll Entry"]);
			}
			d.document="Payroll Entry";
		}
		if(d.type=='Item Group' || d.type=='Item'){
			if (d.parentfield=='accounts'){
				frm.fields_dict.accounts.grid.update_docfield_property("document","options",["Manufacturing","Stock Transfer"]);
			}
			if (d.parentfield=='direct_expense'){
				frm.fields_dict.direct_expense.grid.update_docfield_property("document","options",["Manufacturing","Stock Transfer"]);
			}
			if (d.parentfield=='indirect_expense'){
				frm.fields_dict.indirect_expense.grid.update_docfield_property("document","options",["Manufacturing","Stock Transfer"]);
			}
			if (d.parentfield=='other_income'){
				frm.fields_dict.other_income.grid.update_docfield_property("document","options",["Manufacturing","Stock Transfer"]);
			}
			if (d.parentfield=='other_expense'){
				frm.fields_dict.other_expense.grid.update_docfield_property("document","options",["Manufacturing","Stock Transfer"]);
			}
			if (d.parentfield=='depreciation'){
				frm.fields_dict.depreciation.grid.update_docfield_property("document","options",["Manufacturing","Stock Transfer"]);
			}
			d.document="Manufacturing";
		}
	}
	
});
