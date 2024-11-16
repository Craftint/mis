# Copyright (c) 2023, alantechnologies and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class CompanyBudget(Document):
	pass

@frappe.whitelist()
def account_entrys(budget):
	company=frappe.db.get_value('Company Budget',budget,'company')
	atyp=frappe.db.get_all('Budget Account Types',{'parent':company},'account_types',pluck='account_types')
	accarr=[]
	accnt=frappe.db.get_all('Account', filters= { 'company': company,'root_type':['in',atyp]},fields= ['name','lft','rgt','parent_account','is_group'],order_by="lft, rgt")
	for ac in accnt:
		parentacc=''
		if ac.parent_account:			
			parentacc=get_parent(ac.parent_account,budget)
		accarr.append({
			"doctype":'Company Budget Accounts',			
			"account": ac.name,
    		"parent_company_budget_accounts":parentacc,
			"lft":ac.lft,
			"rgt":ac.rgt,
			"parent":budget,
			"parentfield":"accounts",
			"parenttype":"Company Budget",
			"is_group":ac.is_group
			})
		
	for pc in accarr:
		cdoc = frappe.new_doc('Company Budget Accounts')		
		cdoc.account=pc.get('account')
		if pc.get('parent_company_budget_accounts'):
			cdoc.parent_company_budget_accounts=pc.get('parent_company_budget_accounts')
		cdoc.lft=pc.get('lft')
		cdoc.rgt=pc.get('rgt')
		cdoc.parent=pc.get('parent')
		cdoc.parentfield=pc.get('parentfield')
		cdoc.parenttype=pc.get('parenttype')
		cdoc.is_group=pc.get('is_group')
		cdoc.insert()
		cdoc.save()
		
	doc=frappe.get_doc('Company Budget',budget)	
	doc.account_generated=1
	doc.save()
	return "updated"

def get_parent(acc,budget):
	return frappe.db.get_value('Company Budget Accounts',{'account':acc,'parent':budget},'name')