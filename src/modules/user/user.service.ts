import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseDbService } from 'src/shared/base-db.service';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService extends BaseDbService {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {
    super(model);
  }
}
