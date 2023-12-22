import { Inject, Injectable } from '@nestjs/common';
import { FirebaseAdmin, FirebaseConstants } from 'nestjs-firebase';
import { VersionRepository } from '../ports/out/version.repository';

@Injectable()
export class FirebaseVersionRepository implements VersionRepository{
    constructor(@Inject(FirebaseConstants.FIREBASE_TOKEN) private readonly fa: FirebaseAdmin) {}

    async getVersion(): Promise<string> {
        const versionsCollection = this.fa.firestore.collection('versions');
        const versions = (await versionsCollection.get()).docs;
        const version = versions[versions.length-1].data();
        return version.version;
    }
}
