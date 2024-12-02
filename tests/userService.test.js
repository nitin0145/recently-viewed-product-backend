const userService = require('../services/userService');

test('should fetch recently viewed products', async () => {
    const mockData = [{ id: '123', name: 'Test Product' }];
    jest.spyOn(userService, 'getRecentlyViewed').mockResolvedValue(mockData);

    const data = await userService.getRecentlyViewed('testUserId');
    expect(data).toEqual(mockData);
});
