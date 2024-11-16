# Copyright (c) 2023, alantechnologies and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class CompanyBudget(Document):
	def on_trash(self):
		frappe.db.delete("Company Budget Account List", { "company_budget":self.name})

	def on_update(self):
		if self.name and not self.account_generated:
			budget=self.name			
			company=self.company
			fiscal_year=self.fiscal_year
			atyp=frappe.db.get_all('Budget Account Types',{'parent':company},'account_types',pluck='account_types')	
			accnt=frappe.db.get_all('Account', filters= { 'company': company,'root_type':['in',atyp]},fields= ['name','lft','rgt','parent_account','is_group'],order_by="lft, rgt")
			for ac in accnt:
				parentacc=''
				if ac.parent_account:			
					parentacc=get_parent(ac.parent_account,budget)
				
				cdoc = frappe.new_doc('Company Budget Account List')		
				cdoc.account=ac.name
				if parentacc:
					cdoc.parent_company_budget_account_list=parentacc
				cdoc.lft=ac.lft
				cdoc.rgt=ac.rgt
				cdoc.company_budget=budget
				cdoc.fiscal_year=fiscal_year
				cdoc.is_group=ac.is_group
				cdoc.insert()
				cdoc.save()
			self.account_generated=1
			self.save()

@frappe.whitelist()
def account_entrys(budget):
	cbg=frappe.db.get_value('Company Budget',budget,['company','fiscal_year'], as_dict=1)
	company=cbg.company
	fiscal_year=cbg.fiscal_year
	atyp=frappe.db.get_all('Budget Account Types',{'parent':company},'account_types',pluck='account_types')
	
	accnt=frappe.db.get_all('Account', filters= { 'company': company,'root_type':['in',atyp]},fields= ['name','lft','rgt','parent_account','is_group'],order_by="lft, rgt")
	for ac in accnt:
		parentacc=''
		if ac.parent_account:			
			parentacc=get_parent(ac.parent_account,budget)
		
		cdoc = frappe.new_doc('Company Budget Account List')		
		cdoc.account=ac.name
		if parentacc:
			cdoc.parent_company_budget_account_list=parentacc
		cdoc.lft=ac.lft
		cdoc.rgt=ac.rgt
		cdoc.company_budget=budget
		cdoc.fiscal_year=fiscal_year
		cdoc.is_group=ac.is_group
		cdoc.insert()
		cdoc.save()
		

		
	doc=frappe.get_doc('Company Budget',budget)	
	doc.account_generated=1
	doc.save()
	return "updated"

def get_parent(acc,budget):
	return frappe.db.get_value('Company Budget Account List',{'account':acc,'company_budget':budget},'name')