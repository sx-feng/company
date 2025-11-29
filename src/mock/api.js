const mastergo = (path) => `/image-resource${path}`;

const allArtists = [
  {
    id: 'lin-yaxin',
    name: '林雅心',
    avatar: mastergo('/173964260355666/173964260355669/97c87da7b0edd757f603211744f60691.png'),
    experienceBadges: ['十年经验', '新娘妆达人'],
    rating: 5,
    comments: 128,
    tags: ['新娘妆', '韩式清新', '复古妆容'],
    cover: mastergo('/173964260355666/173964260355669/a26c9612f0ed14ac0823a5d362f39a2d.png'),
    worksText: '查看100个作品 >',
    distance: 2.4,
    price: 899,
  },
  {
    id: 'chen-mengyao',
    name: '陈梦瑶',
    avatar: mastergo('/173964260355666/173964260355669/ccb53124cdbf55ca94e06ac18d77052f.png'),
    experienceBadges: ['五年经验', '时尚博主合作'],
    rating: 4.6,
    comments: 96,
    tags: ['欧美妆', '创意彩妆', '舞台妆'],
    cover: mastergo('/173964260355666/173964260355669/2fd66f703f220033f00c765a480f166e.png'),
    worksText: '查看100个作品 >',
    distance: 4.1,
    price: 699,
  },
  {
    id: 'zhao-wanting',
    name: '赵婉婷',
    avatar: mastergo('/173964260355666/173964260355669/c7bc293c9c8043a8c94992a9e694225c.png'),
    experienceBadges: ['八年经验', '明星御用'],
    rating: 5,
    comments: 215,
    tags: ['中国妆', '旗袍妆', '古典美人'],
    cover: mastergo('/173964260355666/173964260355669/7b9f79e06a8388e6c36ad9b58d1297db.png'),
    worksText: '查看100个作品 >',
    distance: 1.2,
    price: 1299,
  },
  {
    id: 'yang-xinru',
    name: '杨欣茹',
    avatar: mastergo('/173964260355666/173964260355669/97c87da7b0edd757f603211744f60691.png'),
    experienceBadges: ['七年经验', '婚礼团队'],
    rating: 4.8,
    comments: 142,
    tags: ['法式优雅', '轻复古', '新娘妆'],
    cover: mastergo('/173964260355666/173964260355669/7b9f79e06a8388e6c36ad9b58d1297db.png'),
    worksText: '查看120个作品 >',
    distance: 3.6,
    price: 999,
  },
  {
    id: 'liu-nuo',
    name: '刘诺',
    avatar: mastergo('/173964260355666/173964260355669/97c87da7b0edd757f603211744f60691.png'),
    experienceBadges: ['三年经验', '学院派'],
    rating: 4.3,
    comments: 68,
    tags: ['日常清新', '元气妆', '通勤妆'],
    cover: mastergo('/173964260355666/173964260355669/7b9f79e06a8388e6c36ad9b58d1297db.png'),
    worksText: '查看60个作品 >',
    distance: 0.9,
    price: 399,
  },
  {
    id: 'sun-yue',
    name: '孙悦',
    avatar: mastergo('/173964260355666/173964260355669/97c87da7b0edd757f603211744f60691.png'),
    experienceBadges: ['十二年经验', '秀场彩妆'],
    rating: 4.9,
    comments: 187,
    tags: ['舞台妆', '创意彩妆', '红毯妆'],
    cover: mastergo('/173964260355666/173964260355669/7b9f79e06a8388e6c36ad9b58d1297db.png'),
    worksText: '查看140个作品 >',
    distance: 5.4,
    price: 1599,
  },
];

const allDemands = [
  {
    id: 'lin-wanqing',
    name: '林婉清',
    phone: '138****8921',
    avatar: 'https://ai-public.mastergo.com/ai/img_res/bf1dfad3b8778a96e61f5203cfaa043b.jpg',
    budget: '￥3,000 - ￥7,000',
    service: '婚礼全程跟妆 + 新娘早妆',
    time: '2025年4月20日 上午 9:00',
    location: '北京市朝阳区幸福婚礼堂',
    status: '待接单',
  },
  {
    id: 'chen-haoran',
    name: '陈浩然',
    phone: '159****3347',
    avatar: 'https://ai-public.mastergo.com/ai/img_res/2da3f623cbf35ed2a29f2f74fb5f03eb.jpg',
    budget: '￥3,000 - ￥8,000',
    service: '新娘试妆 + 婚礼当天跟妆',
    time: '2025年5月12日 下午 2:00',
    location: '上海市黄浦区外滩花园酒店',
    status: '已确认',
  },
  {
    id: 'zhang-yajing',
    name: '张雅静',
    phone: '136****7782',
    avatar: 'https://ai-public.mastergo.com/ai/img_res/2077c3463092be56b69a4a5694d3a5d0.jpg',
    budget: '￥10,000 - ￥15,000',
    service: '新娘造型设计 + 婚礼全程跟妆',
    time: '2025年6月8日 上午 10:00',
    location: '广州市天河区玫瑰庄园',
    status: '紧急处理',
  },
  {
    id: 'li-yuchen',
    name: '李雨辰',
    phone: '137****4123',
    avatar: mastergo('/173964260355666/173964260355669/c7bc293c9c8043a8c94992a9e694225c.png'),
    budget: '￥1,000 - ￥3,500',
    service: '订婚宴造型 + 婚礼当天跟妆',
    time: '2025年4月30日 下午 1:00',
    location: '杭州市西湖区喜来登酒店',
    status: '待接单',
  },
  {
    id: 'wang-ting',
    name: '王婷',
    phone: '131****9988',
    avatar: mastergo('/173964260355666/173964260355669/ccb53124cdbf55ca94e06ac18d77052f.png'),
    budget: '￥4,000 - ￥8,000',
    service: '户外婚礼全程跟妆',
    time: '2025年7月16日 上午 8:30',
    location: '成都市锦江区远洋太古里',
    status: '已确认',
  },
];

export function fetchArtistList(filterId = 'comprehensive') {
  return new Promise((resolve) => {
    setTimeout(() => {
      const list = [...allArtists];
      switch (filterId) {
        case 'distance':
          list.sort((a, b) => a.distance - b.distance);
          break;
        case 'rating':
          list.sort((a, b) => b.rating - a.rating);
          break;
        case 'price':
          list.sort((a, b) => a.price - b.price);
          break;
        default:
          list.sort((a, b) => b.comments - a.comments);
          break;
      }
      resolve(list);
    }, 650);
  });
}

export function fetchDemandList() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...allDemands]);
    }, 720);
  });
}

export function fetchFilters() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'comprehensive', label: '综合排序' },
        { id: 'distance', label: '距离最近' },
        { id: 'rating', label: '评分最高' },
        { id: 'price', label: '价格最低' },
      ]);
    }, 120);
  });
}

export function fetchMessageData(filterId = 'all') {
  const categories = [
    {
      id: 'service',
      title: '服务消息',
      subtitle: '您有一条新的签约消息',
      date: '2022-03-15',
      color: '#5595FF',
    },
    {
      id: 'system',
      title: '系统消息',
      subtitle: '评价通知',
      date: '2022-04-01',
      color: '#49B9AD',
    },
  ];

  const conversations = [
    {
      id: 'xu-ping',
      name: '许萍',
      message: '我的地址青岛市胶州市广州北路813号',
      date: '2022-04-02',
      avatar: mastergo('/64619689085125/64619689085129/32a4d3be7639208d04e7374f6b3bbbb7.png'),
      unread: 4,
      type: 'company',
    },
    {
      id: 'heng-zhuping',
      name: '衡珠萍',
      message: '能否取消预约？我那天没空',
      date: '2022-04-02',
      avatar: mastergo('/64619689085125/64619689085129/c43c44c15066b6f09e10c2d766dadd02.png'),
      unread: 0,
      type: 'artist',
    },
    {
      id: 'barry-peters',
      name: 'Barry Peters',
      message: '你好，请您通过一下签约申请～',
      date: '2022-03-29',
      avatar: mastergo('/64619689085125/64619689085129/46a5bc8866348497f19371f2d98e0128.png'),
      unread: 0,
      type: 'company',
    },
    {
      id: 'wen-liangren',
      name: '闻梁仁',
      message: '满意，请问你下周三有空不？',
      date: '2022-03-26',
      avatar: mastergo('/64619689085125/64619689085129/405692f9a2ee47e949ac546c4bf2818f.png'),
      unread: 0,
      type: 'artist',
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered =
        filterId === 'all' ? conversations : conversations.filter((item) => item.type === filterId);
      resolve({ categories, conversations: filtered });
    }, 500);
  });
}
