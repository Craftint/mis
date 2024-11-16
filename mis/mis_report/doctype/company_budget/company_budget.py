# Copyright (c) 2023, alantechnologies and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class CompanyBudget(Document):
	def on_trash(self):
		frappe.db.delete("MIS Report Budget", { "company_budget":self.name})
		#frappe.db.delete("Company Budget Account List", { "company_budget":self.name})

	def on_update(self):
		if self.name and not self.account_generated:
			budget=self.name			
			company=self.company
			repset=frappe.db.get_value("MIS Report Settings",self.mis_report_tab,['name','title'],as_dict=1)
			repb=frappe.db.get_all('MIS Report Account Settings',filters={'parent':self.mis_report_tab},fields=['label','group_label','name'],order_by='idx',group_by='label')
			for pb in repb:
				cdoc = frappe.new_doc('MIS Report Budget')	
				cdoc.label=pb.label
				cdoc.group_label=pb.group_label
				cdoc.company_budget=budget
				cdoc.fiscal_year=self.fiscal_year
				cdoc.tab_name=repset.title
				cdoc.mis_report_account_settings=pb.name
				cdoc.insert()
				cdoc.save()
			
			self.account_generated=1
			self.save()


#def get_parent(acc,budget):
#	return frappe.db.get_value('Company Budget Account List',{'account':acc,'company_budget':budget},'name')