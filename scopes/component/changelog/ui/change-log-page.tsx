import { ComponentContext } from '@teambit/component';
import { H1 } from '@teambit/documenter.ui.heading';
import { Separator } from '@teambit/documenter.ui.separator';
import { VersionBlock } from '@teambit/ui.version-block';
import classNames from 'classnames';
import { useSnaps } from '@teambit/ui.hooks.use-snaps';
import { MdxPage } from '@teambit/ui.mdx-page';
import { wideColumn } from '@teambit/base-ui.layout.page-frame';
import { ExportingComponents } from '@teambit/instructions.exporting-components';

import React, { HTMLAttributes, useContext } from 'react';

import styles from './change-log-page.module.scss';

type ChangeLogPageProps = {} & HTMLAttributes<HTMLDivElement>;

export function ChangeLogPage({ className }: ChangeLogPageProps) {
  const component = useContext(ComponentContext);
  const { snaps, loading } = useSnaps(component.id);

  if (!snaps) return null;

  if (snaps.length === 0 && !loading) {
    return (
      <div className={classNames(wideColumn, className)}>
        <MdxPage>
          <ExportingComponents />
        </MdxPage>
      </div>
    );
  }

  const latestVersion = snaps[0]?.tag || snaps[0]?.hash;

  return (
    <div className={classNames(styles.changeLogPage, className)}>
      <H1 className={styles.title}>History</H1>
      <Separator className={styles.separator} />
      {snaps.map((snap, index) => {
        const isLatest = latestVersion === snap.tag || latestVersion === snap.hash;
        return <VersionBlock key={index} componentId={component.id.fullName} isLatest={isLatest} snap={snap} />;
      })}
    </div>
  );
}
