/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { inject, injectable } from "inversify";
import { CommandContribution, CommandRegistry } from '../../application/common';
import { SHOW_REFERENCES } from "../../editor/browser";
import { WorkspaceEdit, Workspace } from "../../languages/common";

/**
 * Show Java references
 */
export const SHOW_JAVA_REFERENCES = 'java.show.references';

/**
 * Apply Workspace Edit
 */
export const APPLY_WORKSPACE_EDIT = 'java.apply.workspaceEdit';

@injectable()
export class JavaCommandContribution implements CommandContribution {

    constructor(
        @inject(Workspace) protected readonly workspace: Workspace
    ) { }

    contribute(commands: CommandRegistry): void {
        commands.registerCommand(SHOW_JAVA_REFERENCES, (uri: string, position: Position, locations: Location[]) =>
            commands.executeCommand(SHOW_REFERENCES, uri, position, locations)
        );
        commands.registerCommand(APPLY_WORKSPACE_EDIT, (changes: WorkspaceEdit) =>
            !!this.workspace.applyEdit && this.workspace.applyEdit(changes)
        );
    }

}
