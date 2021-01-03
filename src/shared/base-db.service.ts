import { GraphQLResolveInfo } from 'graphql';
// import * as graphqlMongodbProjection from 'graphql-mongodb-projection';
import * as graphqlFields from 'graphql-fields';
import { Model } from 'mongoose';
import { PaginationInput } from 'src/shared/pagination.input';
export class BaseDbService {
  private models: Model<any>;
  constructor(dbModel: Model<any>) {
    this.models = dbModel;
  }

  async paginate(
    paginationInput: PaginationInput,
    info: GraphQLResolveInfo,
  ): Promise<any> {
    const fieldsWithSubFieldsArgs = graphqlFields(
      info,
      {},
      { processArguments: true },
    );

    const selections = fieldsWithSubFieldsArgs['items'];

    const mongooseSelection = Object.keys(selections).reduce(
      (a, b) => ({ ...a, [b]: 1 }),
      {},
    );

    const { limit = 30, page = 1 } = paginationInput;
    const hasMore = true;
    const skip = (page - 1) * limit;
    const total = await this.models.countDocuments();
    const totalPage = Math.ceil(total / limit);
    const hasNextPage = page < totalPage;
    const hasPrevPage = page > 1;
    const nextPage = page >= totalPage ? null : page + 1;
    const items = await this.models
      .find()
      .select(mongooseSelection)
      .limit(limit)
      .skip(skip)
      .lean();
    return {
      total,
      hasMore,
      items,
      page,
      limit,
      totalPage,
      hasNextPage,
      hasPrevPage,
      nextPage,
    };
  }

  async findAll<T>(): Promise<T[]> {
    return this.models.find();
  }

  async findOne<T>(id: string): Promise<T> {
    return this.models.findById(id);
  }

  async findBy<T>(key: string, value: any): Promise<T> {
    return this.models.findOne({ [key]: value });
  }

  async create<T>(data: any): Promise<T> {
    const created = new this.models(data);
    await created.save();
    return created;
  }

  async update<T>(data: any): Promise<T> {
    const found = await this.models.findById(data.id);
    if (found) {
      for (const key in data) {
        found[key] = data[key];
      }
    }
    await found.save();
    return found;
  }

  async delete(id: string): Promise<boolean> {
    await this.models.deleteOne({ _id: id });
    return true;
  }

  async checkExists(key: string, value: any): Promise<boolean> {
    const found = await this.models.findOne({ [key]: value });
    if (found) {
      return true;
    } else return false;
  }

  /**
   * INSERT BULK RESOURCE
   * @param data
   */
  async insertMany<T>(data: any[]): Promise<T[]> {
    return this.models.insertMany(data);
  }

  /**
   * DELETE BULK RESOURCE
   */
  async deleteMany(): Promise<void> {
    await this.models.deleteMany({});
  }
}
