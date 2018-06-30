import * as Package from 'pjson';
import { Controller, Get } from 'ts-framework';
import { OAuthClient, OAuthAccessToken } from '../models';

@Controller('/analytics')
export default class AnalyticsController {
  @Get('/active')
  static async getActiveStats(req, res) {
    const condition = { expires: { $gt: new Date() } };

    // Get oauth clients currently active
    const clientIdsNow = await OAuthAccessToken.aggregate([
      { $match: condition },
      { $group: { _id: '$client', count: { $sum: 1 } } },
    ]);

    // Get full info for current clients
    const clientsNow = await OAuthClient.find({ _id: { $in: clientIdsNow.map(i => i._id) } });

    // Get the number of distinct active users
    const distinctNow = await OAuthAccessToken.distinct('user', condition);

    res.success({
      users: distinctNow.length,
      clients: clientsNow.map((client, i) => ({
        id: client._id.toString(),
        clientId: client.clientId,
        platform: client.platform,
        tokens: clientIdsNow[i].count,
      })),
    });
  }
  @Get('/devices')
  static async getDevicesStats(req, res) {
    const match = { $match: { 'userAgent.source': { $exists: '' } } };

    const browser = await OAuthAccessToken.aggregate([match, { $group: { _id: '$userAgent.browser', count: { $sum: 1 } } }]);
    const os = await OAuthAccessToken.aggregate([match, { $group: { _id: '$userAgent.os', count: { $sum: 1 } } }]);

    res.success({
      // Return browser as a hash map
      browser: browser
        .map(b => ({ [b._id]: b.count }))
        .reduce((aggr, next) => ({ ...aggr, ...next }), {}),
      // Return OS as a hash map
      os: os
        .map(b => ({ [b._id]: b.count }))
        .reduce((aggr, next) => ({ ...aggr, ...next }), {}),
    });
  }
}
