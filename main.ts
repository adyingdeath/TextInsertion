import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, MarkdownFileInfo } from 'obsidian';
import { TextInsertionPluginSettings, DEFAULT_SETTINGS, TextInsertionPluginSettingTab } from './settings';

// Remember to rename these classes and interfaces!

export default class TextInsertionPlugin extends Plugin {
	settings: TextInsertionPluginSettings;

	async onload() {
		await this.loadSettings();

		this.registerCommands();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new TextInsertionPluginSettingTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	registerCommands() {
		// 添加命令
		this.settings.items.forEach((item, index) => {
			this.addCommand({
				id: `insert-text-${index}`,
				name: item.displayName || `Insert ${item.text}`,
				editorCallback: (editor: Editor) => {
					editor.replaceSelection(item.text);
				}
			});
		});
	}
}