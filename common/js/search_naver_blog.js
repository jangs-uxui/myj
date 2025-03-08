jQuery(function($)
{
	var ROOT = '';
	
	function printMoney(n) {
		return n;
	}
	
	function naver_search(print_area, search_word, page, pagesize)
	{
		$.ajax(
		{
			url : ROOT + '/tools/search_blog.jsp',
			//url : 'http://www.nyj.go.kr/tools/search_blog.jsp',
			data : {
				search_word : search_word,
				page : page,
				pagesize : pagesize
			},
			method : 'GET',
			dataType : 'json',
			error : function(jqXHR, textStatus, errorThrown)
			{
				alert('네이버 검색 조회 오류가 발생하였습니다.\n'+ errorThrown);
				print_area.remove();
			},
			success : function(data)
			{
				if(!data || data.errorCode)
				{
					alert(data.errorMessage);
				}
				
				if(data.items && data.items.length > 0)
				{
					var h3 = print_area.find('h3'),
						list = print_area.find('ul');
					
					if(h3.length <= 0)
					{
						h3 = '<h3>여행기</h3>';
						print_area.append(h3);
					}
					
					if(list.length <= 0)
					{
						list = $('<ul class="bu"></ul>');
						print_area.append(list);
					}
					
					var more = $('#naver_search_more');
					if(more.length <= 0 && data.total > pagesize)
					{
						more = $('<a id="naver_search_more" href="#more" class="p-button info more">더보기 : <span></span></a>');
						print_area.append(more);
						
						more.click(function(e)
						{
							var self = $(this),
								d_page = self.data('page'),
								d_pagesize = self.data('pagesize');
							
							naver_search(print_area, search_word, d_page + 1, d_pagesize);
							
							return false;
						});
					}
					
					if(page * pagesize >= data.total) more.hide();
					
					more.data('page', page).data('pagesize', pagesize);
					
					more.find('span').text(printMoney(page * pagesize) + ' / '+ printMoney(data.total) +'건');
					
					for(var i=0; i<data.items.length; i++)
					{
						var item = data.items[i],
							li = $('<li></li>'),
							a = $('<a target="_blank" title="새창열림" href="'+ item.link +'"></a>');
						
						list.append(li);
						li.append(a);
						
						a.html('<em>['+ item.bloggername +'] '+ item.title +'</em><br/>'+ item.description);
					}
				}
			}
		});
	}
	
	// 네이버 검색 결과 출력
	$('#naver_search_ressult').each(function(index)
	{
		var self = $(this),
			add_keyword = self.data('add-keyword') || '',
			keyword = self.data('keyword') || '';
		
		if(keyword == '')
		{
			self.remove();
			return;
		}
		
		keyword = keyword.replace(/[()]/g, ' ');
		
		if(keyword.search(/[/,]/) > -1)
			naver_search(self, keyword.replace(/[/,]/g, ' ') +' '+ add_keyword, 1, 5);
		else
			naver_search(self, '"'+ keyword +'" '+ add_keyword, 1, 5);
	});
});