# Copyright (c) 2023, alantechnologies and contributors
# For license information, please see license.txt

# import frappe


from erpnext.accounts.report.accounts_receivable_summary.accounts_receivable_summary import (
	AccountsReceivableSummary,
)


def execute(filters=None):
	args = {
		"party_type": "Supplier",
		"naming_by": ["Buying Settings", "supp_master_name"],
	}
	return AccountsReceivableSummary(filters).run(args)
