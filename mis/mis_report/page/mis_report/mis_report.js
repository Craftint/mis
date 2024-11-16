
frappe.pages['mis-report'].on_page_load = function(wrapper) {
	new MyPage(wrapper);
}

var script = document.createElement("script");
script.src = '/assets/js/bootstrap-4-web.min.js';  // set its src to the provided URL
document.head.appendChild(script);

var cyear=new Date().getFullYear();

MyPage =Class.extend({
	
	init: function(wrapper){
			this.page = frappe.ui.make_app_page({
			parent: wrapper,
			title: 'MIS Report',
			single_column: true
		});
			this.make();
	},
	make: function()
	{
		
		var company=frappe.defaults.get_user_default("Company");
		if(frappe.get_route()[1])
		{
			company=frappe.get_route()[1];
		}
			let field = this.page.add_field({
			label: 'Company',
			fieldtype: 'Link',
			fieldname: 'company',
			options: 'Company',
			reqd: 1,
			change() {
				//get_report();
				//var base_url = window.location.origin;
				frappe.set_route("mis-report/"+field.get_value());
				//var url=base_url+'/app/mis-report/'+field.get_value();
				
				frappe.ui.toolbar.clear_cache();
				
				location.reload(true);
			},
			default:company
		});
		
		let field1 = this.page.add_field({
			label: 'Fiscal Year',
			fieldtype: 'Link',
			fieldname: 'fiscal_year',
			options: 'Fiscal Year',
			reqd:1,
			default:cyear,
			change() {
				
				get_report();
				
			}
		});

		let field2 = this.page.add_field({
			label: 'Month',
			fieldtype: 'Select',
			fieldname: 'month',
			options: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
			reqd:1,
			change() {
				
				get_report();
				
			}
		});

		
		this.page.add_inner_button('Print', () => print_rep());
		this.page.add_inner_button('Download', () => download_rep());
		let data={'company':field.get_value()};
		var pg=this.page.main;
		//$(frappe.render_template("mis_report",data)).appendTo(this.page.main);

		/*$('#myTab a').on('click', function (e) {
			
			e.preventDefault();
			$(this).tab('show');
			return false;
		  })
		  $('#myTab a').click( function(e) {
			e.preventDefault();
			$(this).tab('show');
			return false;
		});*/
		function load_tab(){
			frappe.call({
				method: 'mis.mis_report.page.mis_report.mis_report.get_tab_list',
				args: {
					company: field.get_value(),
				},
				callback: function (r) {
				if (r.message) {
					data={'company':field.get_value(),'tabs':r.message};
					$(frappe.render_template("mis_report",data)).appendTo(pg);
					$('#myTab a').on('click', function (e) {
				
						e.preventDefault();
						$(this).tab('show');
						return false;
					});
				}
				},
			}); 

		}
		load_tab();
		
		
		function get_report()
		{
			//pg.html('');
			//$('#mis_report').html('');
			//load_tab();
			
			if(field.get_value() && field1.get_value() && field2.get_value())
			{		
					frappe.call({
					method: 'mis.mis_report.page.mis_report.mis_report.get_report',
					freeze: 1,
					freeze_message: 'Data loading ...please waite',
					args: {
					  company: field.get_value(),
					  fiscal_year: field1.get_value(),
					  fiscal_month: field2.get_value(),					  
					},
					callback: function (r) {
					  if (r.message) {
						
						  for (const [key, value] of Object.entries(r.message)) {
							
							$('#'+key).html(value);
						  }
						  
					  }
					},
				  });
	  
			}
		}
		function download_rep()
		{
			
			
			frappe.call({
				method: "mis.mis_report.page.mis_report.mis_report.down_report",
				args: {
					company: field.get_value(),
					  fiscal_year: field1.get_value(),
					  fiscal_month: field2.get_value(),	
				},
				callback: function(response) {
				  var files = response.message;
				  //window.open("/api/method/livestock.poultry.page.poultry_dashbord.poultry_dashbord.down_file");
				  let url='/api/method/mis.mis_report.page.mis_report.mis_report.down_file';
				  open_url_post(url, {file: files}); 
				}
			  }); 

			  
		}
		
		
		
	}


})
function get_table_data(id)
		{
			const trs = document.querySelectorAll(id);

			const result = [];
			
			for(let tr of trs) {
				let th_array=[];
				let td_array=[];
				let th_td_array=[];
				let th = tr.getElementsByTagName('th');
				if (th.length > 0) {
					th_array = Array.from(th);
					th_array = th_array.map(tag => tag.innerText);
					
				}

				let td = tr.getElementsByTagName('td');
				if (td.length > 0) {
					td_array = Array.from(td);
					td_array = td_array.map(tag => tag.innerText);
					
				}
				
				th_td_array = th_td_array.concat(th_array,td_array); // get the text of each element
				result.push(th_td_array);
			}
			return result;
		}
		
function print_rep()
		{

			  var divrear=document.getElementById('mis_report');
					
					  var newWin=window.open('','Print-Window');
					  newWin.document.open();
					  newWin.document.write('<html><style>table, th, td {border: 1px solid;border-collapse: collapse; } table{ width:100%;} table td{ text-align:right;} table td:first-child{ text-align:left;} .table-secondary td,.table-secondary th {background-color: #d5d7d9;font-weight: bold;} #rephd{ font-size: 18px; font-weight: bold; padding: 15px;}  @media print { #prod{overflow-x:unset !important;} #rer{overflow-x:unset !important;} } </style><body onload="window.print()">'+divrear.innerHTML+'</body></html>');
					  newWin.document.close();
					  setTimeout(function(){newWin.close();},10);
  
		}