// Copyright (c) 2023, alantechnologies and contributors
// For license information, please see license.txt
this.data = [];
frappe.ui.form.on('Company Budget', {
	 refresh: function(frm) {
		//frappe.db.get_list('Account', { filters: { 'company': cur_frm.doc.comany, }, fields: ['name'], limit: 500, }).then(res => { console.log(res) });
		//Income root_type Expense
		frm.set_query('cost_center', function(doc, cdt, cdn) {
		  
			return {
			   "filters": {
			"company": doc.company,
		}
			};
		});
		if (frm.doc.account_generated==1)
		{

			frm.add_custom_button(__('Update Monthly Budget'), function(){
            
				frappe.route_options = {
					"company_budget":frm.doc.name,
					"fiscal_year":frm.doc.fiscal_year,
				};
				
				frappe.set_route(["mis-report-budget","view","report"]);
				//frappe.set_route(["company-budget-account-list","view","report"]);
				
			}).removeClass("btn-default").addClass("btn-success");
		}
		
	
		
	},
	add_amount: function(frm) {
		
		

	},
	generate_accounts_data: function(frm) {
		
		 frappe.call(
			{ 
				method: "mis.mis_report.doctype.company_budget.company_budget.account_entrys",
				freeze: true,
    			freeze_message: "Creating documents",
				args: {
					budget:frm.doc.name
				},
				callback: function(r) 
					{ 
						
						frm.refresh_fields();
						frm.refresh_field('account_generated');
						//location.reload();
						msgprint(" Data Populated");
					}
			});
		

	},
});

